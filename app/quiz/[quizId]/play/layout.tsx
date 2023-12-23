"use client";

import React, { useState, useEffect } from "react";

function Layout({ children}: {children: React.ReactNode}) {

  return (
    <section>
      <main className="relative overflow-hidden">{children}</main>
    </section>
  );
};

export default Layout;
