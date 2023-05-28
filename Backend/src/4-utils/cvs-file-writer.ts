import dataService from "../5-services/data-service";

export async function createCvs(): Promise<string>{
  const fileData = await dataService.getFollowersData(); // getting an array of data from the db
  const csv = stringifyData(fileData); // transforming it to one string
  return csv;
};

function stringifyData(data: any[]): string { // turning the data into srting
  const headers = Object.keys(data[0]).join(', ,');
  const rows = data.map((item) => Object.values(item).join(','));  
  return headers + '\n' + rows.join('\n');
}
