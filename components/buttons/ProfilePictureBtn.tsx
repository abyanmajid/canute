"use client";

import Image from "next/image";

export default function ProfilePictureBtn({
  role,
  session,
  profilePicture,
  sendProfilePage,
}: {
  role: string;
  session: any;
  profilePicture: string;
  sendProfilePage: any;
}) {
  return (
    <div>
      {session ? (
        <button
          onClick={async () => {
            await sendProfilePage(role, session);
          }}
          className="flex text-smrounded-full md:me-0"
        >
          <Image
            className="ml-4 rounded-full"
            src={profilePicture}
            alt="profile-picture"
            width={40}
            height={40}
          />
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
