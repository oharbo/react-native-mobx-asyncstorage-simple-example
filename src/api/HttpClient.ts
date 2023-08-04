export type User = { readonly name: string; readonly age: number };

export class HttpClient {
  private static readonly users: User[] = [
    { name: "Matthew", age: 15 },
    { name: "Alexander", age: 32 },
    { name: "Samuel", age: 22 },
  ];

  public static async fetchUsers(): Promise<User[]> {
    return Promise.resolve(HttpClient.users);
  }
}
