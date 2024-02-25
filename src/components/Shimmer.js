const Shimmer = () => {
  const cards = [];
  for (let i = 0; i < 20; i++) {
    cards.push(
      <div
        key={i}
        className="shimmer-card w-[236px] h-[328px] border border-solid border-gray-300 rounded-2xl p-2 shadow-[3px_3px_4px_0_rgba(165,165,165,0.342)] bg-gradient-to-r from-[#f6f6f6_8%] via-[#e4e4e4_18%] to-[#f6f6f6_33%] mb-6"
      ></div>
    );
  }
  return (
    <div className="shimmer-container flex flex-wrap gap-y-4 gap-x-7">
      {cards.map((card) => {
        return card;
      })}
    </div>
  );
};

export default Shimmer;
