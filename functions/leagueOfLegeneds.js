exports.handler = async () => {
  console.log("function ran");
  const data = { championName: "Ahri", gender: "female", type: "mage" };

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
