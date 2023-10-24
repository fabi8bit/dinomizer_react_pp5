import { rest } from "msw";

const baseURL = "https://dinomizer-api-391f3ee03dea.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 6,
        username: "Piggy",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 6,
        profile_image:
          "https://res.cloudinary.com/dhsjcm3v3/image/upload/v1/media/images/flyingpig_zr9e5w",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`${baseURL}profiles/6/`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: 6,
        owner: "Piggy",
        created_at: "11 Oct 2023",
        updated_at: "11 Oct 2023",
        name: "Porcu",
        content: "Sgrunt!",
        image:
          "https://res.cloudinary.com/dhsjcm3v3/image/upload/v1/media/images/flyingpig_zr9e5w",
        is_owner: true,
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
