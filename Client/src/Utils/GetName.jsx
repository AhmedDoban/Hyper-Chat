export const GetName = (FirstName, LastName) => {
  if (typeof FirstName === "string") {
    const FS = FirstName;
    const LS = LastName;
    const Name = FS[0] + LS[0];
    return Name;
  }
};
