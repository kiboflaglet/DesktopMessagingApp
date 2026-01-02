import { handleError } from "@/common/utils/handleError";
import { serviceResponse } from "@/common/utils/serviceResponse";
import bcrypt from 'bcrypt';
import { StatusCodes } from "http-status-codes";
import { generateAccessToken, generateRefreshToken, getPayloadFromAccessToken, getPayloadFromRefreshToken } from "./jwtActions";
import { GetUser, LoginUser, RefreshLoginUser, RegisterUser, UserProtected, UserToken } from "./users.model";
import { UserRepository } from "./users.repository";

class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository = new UserRepository()) {
        this.userRepository = userRepository
    }

    async findAll(): Promise<serviceResponse<UserProtected[] | null>> {
        try {
            const data = await this.userRepository.findAllUsers()
            return serviceResponse.success(data.length ? "Users found" : "No users found", data)
        } catch (error) {
            const errorMessage = 'An error occurred while retrieving users'
            handleError(`${errorMessage}: ${(error as Error).message}`);
            return serviceResponse.failure(errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async getCurrentSessionFromUser(data: RefreshLoginUser): Promise<serviceResponse<UserToken | null>> {
        try {

            let payload = data.accessToken ? await getPayloadFromAccessToken(data.accessToken) : null

            if (!payload) {
                payload = await getPayloadFromRefreshToken(data.refreshToken)
            }

            const { id } = payload

            const user = await this.userRepository.findUserById({ id: id as string })

            if (!user) {
                return serviceResponse.failure("Credentials wrong", null, StatusCodes.UNAUTHORIZED)
            }

            const accessToken = data.accessToken ? data.accessToken : await generateAccessToken({
                id: user.id
            })

            const response: UserToken = {
                id: user.id,
                username: user.username,
                fullName: user.fullName,
                accessToken,
                refreshToken: data.refreshToken
            }

            return serviceResponse.success("Successful login!", response, StatusCodes.OK)

        } catch (error) {
            const errorMessage = "Login failed";
            handleError(`${errorMessage}: ${(error as Error).message}`);
            return serviceResponse.failure(errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async login(data: LoginUser): Promise<serviceResponse<UserToken | null>> {
        try {

            const user = await this.userRepository.findUserByUsername(data.username)

            if (!user) {
                return serviceResponse.failure("Credentials wrong", null, StatusCodes.NOT_FOUND)
            }

            const passwordMatch = await bcrypt.compare(data.password, user.password)

            if (!passwordMatch) {
                return serviceResponse.failure("Credentials wrong", null, StatusCodes.NOT_FOUND)
            }

            const accessToken = await generateAccessToken({
                id: user.id
            })

            const refreshToken = await generateRefreshToken({
                id: user.id
            })

            const response: UserToken = {
                id: user.id,
                username: user.username,
                fullName: user.fullName,
                accessToken,
                refreshToken
            }

            return serviceResponse.success("Successful login!", response, StatusCodes.OK)

        } catch (error) {
            const errorMessage = "An error occurred while login";
            handleError(`${errorMessage}: ${(error as Error).message}`);
            return serviceResponse.failure(errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR)

        }
    }

    async register(data: RegisterUser): Promise<serviceResponse<UserToken | null>> {
        try {


            const user = await this.userRepository.createUser(data)

            if (!user) {
                return serviceResponse.failure("Register failed", null, StatusCodes.BAD_REQUEST)
            }


            const accessToken = await generateAccessToken({
                id: user.id
            })

            const refreshToken = await generateRefreshToken({
                id: user.id
            })


            const response: UserToken = {
                id: user.id,
                username: user.username,
                fullName: user.fullName,
                accessToken,
                refreshToken
            }

            return serviceResponse.success("Successful login!", response, StatusCodes.OK)


        } catch (error) {
            const errorMessage = "Error happened while creating user";
            handleError(`${errorMessage}: ${(error as Error).message} `)

            return serviceResponse.failure(errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async getUserById(data: GetUser): Promise<serviceResponse<UserProtected | null>> {
        try {
            const res = await this.userRepository.findUserById(data)
            if (res) {
                const { password, ...protectedUser } = res
                return serviceResponse.success("User fetched", protectedUser)
            }
            handleError("User fetched failed")
            return serviceResponse.failure("User fetched failed", null,  StatusCodes.BAD_REQUEST)

        } catch (error) {
            const errorMessage = "Error while fetching user"
            handleError(`${errorMessage}: ${(error as Error).message}`)
            return serviceResponse.failure(errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

}

export const userService = new UserService()