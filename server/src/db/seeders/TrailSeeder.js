import { Trail } from "../../models/index.js"

class TrailSeeder {
  static async seed() {
    const trailsData = [
      {
        trailName:"Brook Farm Walking Trail", 
        trailLength:4, 
        trailLocation:"West Roxbury, MA 02132", 
        trailDescription:"Never crowded, easy to get to, and a small but adequate parking area.", 
        estimateTime:45
      },
      {
        trailName:"Watertown Riverfront Park and Braille Trail",
        trailLength:2,
        trailLocation:"Watertown, MA 02472",
        trailDescription:"Beautiful, runs along the Charles River Basin and great disabled access.",
        estimateTime:40
      },
      {
        trailName:"North Point Park Walk",
        trailLength:1,
        trailLocation:"Paul Revere Park, Boston, MA 02129",
        trailDescription:"Walk along the Waterfront from Paul Revere Park to North Point Park. Bike and stroller friendly"
      },
      {
        trailName:"Ashland Reservoir Loop Trail",
        trailLength:2,
        trailLocation:"Ashland, MA 01721",
        trailDescription:"The trail makes a loop around the reservoir, crossing the dam on fairly flat wooded paths.",
        estimateTime:40
      },
      {
        trailName:"Berry Pond Trail",
        trailLength:2,
        trailLocation:"North Andover, MA 01845",
        trailDescription:"The Berry Pond Trail is a 2 mile loop that starts and ends at the Jenkins Parking Lot. This description proceeds in a clockwise direction. ",
        estimateTime:40
      },
    ]
    
    for (const singleTrailData of trailsData) {
      const currentTrail = await Trail.query().findOne({ trailName: singleTrailData })
      if (!currentTrail) {
        await Trail.query().insert(singleTrailData)
      }
    }
  }
}

export default TrailSeeder