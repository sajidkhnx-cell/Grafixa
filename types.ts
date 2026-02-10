import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatarUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
  sources?: { title: string; uri: string }[];
}