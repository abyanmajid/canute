"use client";

function Layout({ children}: {children: React.ReactNode}) {

  return (
    <section>
      <main className="relative overflow-hidden">{children}</main>
    </section>
  );
};

export default Layout;
