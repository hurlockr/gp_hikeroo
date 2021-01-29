import { Trail } from "../../models/index.js"

class TrailSeeder {
  static async seed() {
    const trailsData = [
      {
        name: "Brook Farm Walking Trail",
        length: 4,
        location: "West Roxbury, MA 02132",
        description: "Never crowded, easy to get to, and a small but adequate parking area.",
        estimateTime: 45,
      },
      {
        name: "Watertown Riverfront Park and Braille Trail",
        length: 2,
        location: "Watertown, MA 02472",
        description: "Beautiful, runs along the Charles River Basin and great disabled access.",
        estimateTime: 40,
      },
      {
        name: "North Point Park Walk",
        length: 1,
        location: "Paul Revere Park, Boston, MA 02129",
        description:
          "Walk along the Waterfront from Paul Revere Park to North Point Park. Bike and stroller friendly",
      },
      {
        name: "Ashland Reservoir Loop Trail",
        length: 2,
        location: "Ashland, MA 01721",
        description:
          "The trail makes a loop around the reservoir, crossing the dam on fairly flat wooded paths.",
        estimateTime: 40,
      },
      {
        name: "Berry Pond Trail",
        length: 2,
        location: "North Andover, MA 01845",
        description:
          "The Berry Pond Trail is a 2 mile loop that starts and ends at the Jenkins Parking Lot. This description proceeds in a clockwise direction. ",
        estimateTime: 40,
      },
    ]

    for (const singleTrailData of trailsData) {
      const currentTrail = await Trail.query().findOne({ name: singleTrailData })
      if (!currentTrail) {
        await Trail.query().insert(singleTrailData)
      }
    }
  }
}

export default TrailSeeder
