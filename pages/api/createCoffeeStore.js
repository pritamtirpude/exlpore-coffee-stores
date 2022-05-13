import {
  getMinifiedRecords,
  table,
  findRecordByFilter,
} from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, imgUrl, address, neighbourhood, voting } = req.body;

    try {
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          res.json(records);
        } else {
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);

            const records = getMinifiedRecords(createRecords);
            res.json(records);
          } else {
            res.status(400);
            res.json({ message: "id & name is required" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "id is required" });
      }
    } catch (error) {
      console.error("Error creating or finding a store", error);
      res.status(500);
      res.json({ message: "Error creating or finding a store", error });
    }
  }
};

export default createCoffeeStore;
