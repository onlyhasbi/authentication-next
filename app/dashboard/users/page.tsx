"use client";

import { Button } from "@/components/ui/button";
import { signout } from "@/action/auth";

function Users() {
  return (
    <div>
      <label>Users</label>
      <form action={signout}>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 rounded px-3 py-2 text-white text-sm"
        >
          Sign Out
        </button>
      </form>
    </div>
  );
}

export default Users;
