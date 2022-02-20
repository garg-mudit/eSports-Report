exports.handler = async (event, context) => {
  if (context.clientContext.user) {
    const guides = [
      {
        slug: "master-csing",
        title: "Master csing",
        author: "some teemo player",
        tags: ["League of Legends"],
      },
      {
        slug: "master-kiting",
        title: "Master kiting",
        author: "some iron IV player",
        tags: ["League of Legends"],
      },
      {
        slug: "master-ksing",
        title: "Master ksing",
        author: "every league player",
        tags: ["League of Legends"],
      },
    ];

    return {
      statusCode: 200,
      body: JSON.stringify(guides),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ msg: "You must be logged in to see this" }),
  };
};
