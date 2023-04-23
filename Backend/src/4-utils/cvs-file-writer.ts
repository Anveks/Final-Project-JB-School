import dataService from "../5-services/data-service";
import fs from 'fs'
import path from "path";

export async function createCvs(): Promise<string>{
  const fileData = await dataService.getFollowersData(); // getting an array of data from the db
  const csv = stringifyData(fileData); // transforming it to one string
  // const filename = 'data.csv'; // name the file
  // const folder = path.join(__dirname, '..', '1-assets', 'csv-data'); // specify file folder
  // const filepath = `${folder}/${filename}`; // bring name and folder together
  // fs.writeFileSync(filepath, csv, 'utf-8'); // create the file in a speficied folder being csv format
  return csv;
};

function stringifyData(data: any[]): string {
  const headers = Object.keys(data[0]).join(', ,');
  const rows = data.map((item) => Object.values(item).join(','));  
  return headers + '\n' + rows.join('\n');
}

// TODO: cleanup