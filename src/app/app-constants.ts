export class AppConstants {


    public static get urlServidor(): string {
        return "http://localhost:8080/"
    }

    public static get urlApiLogin(): string{
        return this.urlServidor + "cars-and-users-api/api/signin"
    }

    public static get urlApiUsers(): string {
        return this.urlServidor + "cars-and-users-api/api/users/"
    }

    public static get urlApiCars(): string {
        return this.urlServidor + "cars-and-users-api/api/cars/"
    }
}
