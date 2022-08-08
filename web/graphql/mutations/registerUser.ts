export const RegisterUser = `
mutation RegisterUser($user: RegisterInput!) {
  registerUser(user: $user){
    id
    userName
    email
  }
}
`;
