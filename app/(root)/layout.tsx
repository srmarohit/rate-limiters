import { Metadata } from "next";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div>
      <h1>root Layout Header</h1>
      {children}
    </div>
  );
}

export const metaData: Metadata = {
  title: "About Page",
  description: "This is About Page.",
};
