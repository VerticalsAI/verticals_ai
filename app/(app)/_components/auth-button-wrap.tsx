"use client";

import React from "react";
import AuthButton from "./sidebar/auth-button";

export default function AuthButtonWrap() {
  return (
    <div className="flex fixed z-50 right-3 top-3 justify-end">
      <AuthButton />
    </div>
  );
}
