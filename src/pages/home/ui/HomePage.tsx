import { Contacts } from "@/widgets/contacts";
import { Parallax } from "@/widgets/parallax";
import { Footer } from "@/widgets/footer";
import { TicketsSection } from "@/widgets/tickets";
import { ToursSection } from "@/widgets/tours";
import { Explore } from "@/widgets/explore";
import { Journey } from "@/widgets/journey";
import { Welcome } from "@/widgets/welcome";
import { Gallery } from "@/widgets/gallery";

export default function HomePage() {
  return (
    <>
      <main>
        <Welcome />
        <ToursSection />
        <Explore />
        <Journey />
        <Gallery />
        <TicketsSection />
        <Parallax />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
