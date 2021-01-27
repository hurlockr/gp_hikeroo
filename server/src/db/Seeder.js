import { connection } from "../boot.js"
import TrailSeeder from "./seeders/TrailSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("seeding trails")
    await TrailSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder