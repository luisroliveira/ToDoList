"use client";

import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { UpperBar } from "../../../components/ui/UpperBar/UpperBar";
import "../../globals.css";
import { ProfilePicture } from "@/components/ui/ProfilePicFrame/ProfilePicture";
import { GenericPost } from "@/components/ui/GenericPost/GenericPost";
import classes from "./MyProfile.module.css";
import { MiddleBar } from "@/components/ui/MiddleBar/MiddleBar";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/components/ui/UserProfile/userprofile";
import { PostType, UserType } from "@/lib/custom_types";
import axios from "axios";
import { useSession } from "next-auth/react";
// import { getServerSession } from 'next-auth';
import { PostModal } from "@/components/ui/PostModal";
import { useToast } from "@/components/ui/use-toast";

const inter = Inter({ subsets: ["latin"] });

const user_id = "cltja5xsc000010ofm3k2pwix";

export default function MyProfilePage({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType>();
  const [received_posts, setPosts] = useState<PostType[]>();
  const [date, setDate] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Bem-vindo",
      description: "Seja bem-vindo ao seu perfil",
    });
  }, [toast]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/" + user_id)
      .then((response) => setUser(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/" + user_id + "/posts/" + date)
      .then((response) => {
        if (response.status == 204) {
          setPosts([]);
        } else {
          setPosts(response.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, [date]);

  if (!user || !received_posts) return null;

  const set_posts_date = received_posts.map((post) => {
    post.date = new Date(post.date);
    return post;
  });

  set_posts_date.sort(
    (post1, post2) => post2.date.getTime() - post1.date.getTime()
  );
  console.log(set_posts_date);

  const post_list = set_posts_date.map((post) => <GenericPost post={post} />);

  return (
    <div style={{ backgroundColor: "var(--background-color)", height: "100%" }}>
      {children}

      <UpperBar text="Meu perfil" />
      <section style={{ paddingTop: "90px" }}>
        <UserProfile
          userName={user.name}
          nickName={user.nickName}
          numFollow={10}
          numFollowers={10}
          numPosts={post_list.length}
          userId={user_id}
        />
        <MiddleBar setDate={setDate} />
      </section>

      <section>{post_list}</section>
    </div>
  );
}
