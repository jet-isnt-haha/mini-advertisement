import AdCard from "@/components/AdCard";

const Home = () => {
  return (
    <div>
      <AdCard
        title="Sample Title"
        content="Sample content for the advertisement."
        publisher="jet "
        price={100}
        clickCount={50}
      />
    </div>
  );
};

export default Home;
