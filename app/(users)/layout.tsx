export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div>
      <h1>User Layout Header</h1>
      {children}
    </div>
  );
}
