import type {
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
  User,
} from "../types";
import { api } from "./axiosInstance";

export async function registerUser(
  input: RegisterInput,
): Promise<RegisterResponse> {
  const res = await api.post<RegisterResponse>("/auth/register", input);
  return res.data;
}

export async function loginUser(input: LoginInput): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/auth/login", input);
  return res.data;
}

export async function getMyProfile(): Promise<User> {
  const res = await api.get<User>("/users/me");
  return res.data;
}
