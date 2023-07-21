export const handleStyleHover = (btnHover: boolean) => {
  return {
    color: btnHover ? "#4DB5BC" : "#333333",
    transition: "color 0.2s ease",
  };
};
