interface User {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    city: string;
    country: string;
    bio: string;
    author: boolean;
}

export default User;