export const testUserData = {
  name: "Test_Name",
  email: "test@stud.noroff.no",
  avatar: "",
  venueManager: true,
  venues: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "string",
      description: "string",
      media: "string",
      price: 0,
      maxGuests: 0,
      rating: "string",
      created: "2023-05-07T10:44:46.479Z",
      updated: "2023-05-07T10:44:46.479Z",
      meta: {
        wifi: true,
        parking: true,
        breakfast: true,
        pets: true,
      },
      location: {
        address: "string",
        city: "string",
        zip: "string",
        country: "string",
        continent: "string",
        lat: 0,
        lng: 0,
      },
      owner: {
        name: "string",
        email: "string",
        avatar: "string",
      },
      bookings: [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          dateFrom: "2023-05-07T10:44:46.479Z",
          dateTo: "2023-05-07T10:44:46.479Z",
          guests: 0,
          created: "2023-05-07T10:44:46.479Z",
          updated: "2023-05-07T10:44:46.479Z",
        },
      ],
    },
  ],
  bookings: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      dateFrom: "2023-05-07T10:52:42.433Z",
      dateTo: "2023-05-07T10:52:42.433Z",
      guests: 0,
      created: "2023-05-07T10:52:42.433Z",
      updated: "2023-05-07T10:52:42.433Z",
      venue: {
        id: "string",
        name: "string",
        description: "string",
        media: "string",
        price: "string",
        maxGuests: "string",
        rating: "string",
        created: "string",
        updated: "string",
        meta: "string",
        location: "string",
        owner: "string",
      },
      customer: {
        name: "string",
        email: "string",
        avatar: "string",
      },
    },
  ],
  _count: {
    venues: 1,
    bookings: 1,
  },
};
