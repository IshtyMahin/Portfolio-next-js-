import BubbleBackground from "@/components/BubbleBackgroud";
import Header from "@/components/Header";


export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Header />
      <BubbleBackground />
      <div className="bg-gray-900/70">{children}</div>
    </div>
  );
}
