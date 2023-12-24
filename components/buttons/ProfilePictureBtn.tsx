"use client";

import Image from "next/image";

export default function ProfilePictureBtn({
  session,
  profilePicture,
  sendProfilePage,
}: {
  session: any;
  profilePicture: string;
  sendProfilePage: any;
}) {
  return (
    <div>
      {session ? (
        <button
          onClick={() => {
            sendProfilePage();
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
