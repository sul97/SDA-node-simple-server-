export const isLoggedIn = (req, res, next) => {
  const login = true;
  if (login) {
    next();
  } else {
    return res.send("please login first");
  }
};

export const isAdnim = (req, res, next) => {
  const admin = true;
  if (admin) {
    next();
  } else {
    return res.send("sorry you are not admin");
  }
};
