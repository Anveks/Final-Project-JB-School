import dataService from "../5-services/data-service";

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function createCvs(){
  const vacationData = await dataService.getFollowersData();
  console.log(vacationData);

  const csvWriter = createCsvWriter({
    path: 'vacation-data.csv',
    header: [
      {id: 'destination', title: 'Destination'},
      {id: 'followers', title: 'Number of Followers'}
    ]
  });

  csvWriter.writeRecords(vacationData)
  .then(() => console.log('CSV file created successfully.'));
};

function stringifyData(data: any[]) {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map((item) => Object.values(item).join(','));
  return headers + '\n' + rows.join('\n');
}

export default stringifyData;