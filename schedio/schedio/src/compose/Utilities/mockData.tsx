export let MessageData = [
    {
      id: "1",
      dateSent: "2023-11-10",
      time: "14:35",
      body: "Great work on the post! Can you crop the last 30 seconds",
      sender: "Alice",
      reactions: [
        { emoji: "👍", reactor: "Bob", counted: false },
        { emoji: "❤️", reactor: "Charlie", counted: false }
      ],
      replies: [
        {
          dateSent: "2023-11-10",
          time: "14:36",
          body: "Sure, will do",
          sender: "Bob"
        },
        {
          dateSent: "2023-11-10",
          time: "14:37",
          body: "Thanks!",
          sender: "Alice"
        }
      ]
    },
    {
      id: "2",
      dateSent: "2023-11-10",
      time: "15:00",
      body: "Perhaps edit the video for better lighting",
      sender: "Charlie",
      reactions: [
        { emoji: "👀", reactor: "Alice", counted: false }
      ],
      replies: [
        {
          dateSent: "2023-11-10",
          time: "15:05",
          body: "I tried and it looks unnatural...",
          sender: "Alice"
        },
        {
          dateSent: "2023-11-10",
          time: "15:06",
          body: "Got it",
          sender: "Bob"
        }
      ]
    },
    // {
    //   id: "3",
    //   dateSent: "2023-11-11",
    //   time: "09:15",
    //   body: "Good morning everyone!",
    //   sender: "Bob",
    //   reactions: [
    //     { emoji: "☕", reactor: "Alice", counted: false },
    //     { emoji: "😊", reactor: "Charlie", counted: false }
    //   ],
    //   replies: [
    //     {
    //       dateSent: "2023-11-11",
    //       time: "09:16",
    //       body: "Good morning, Bob!",
    //       sender: "Alice"
    //     },
    //     {
    //       dateSent: "2023-11-11",
    //       time: "09:17",
    //       body: "Morning, all!",
    //       sender: "Charlie"
    //     }
    //   ]
    // },
    // {
    //   id: "4",
    //   dateSent: "2023-11-11",
    //   time: "11:45",
    //   body: "Who's up for lunch at noon?",
    //   sender: "Alice",
    //   reactions: [
    //     { emoji: "🍕", reactor: "Charlie", counted: false },
    //     { emoji: "🍔", reactor: "Bob", counted: false }
    //   ],
    //   replies: [
    //     {
    //       dateSent: "2023-11-11",
    //       time: "11:46",
    //       body: "Count me in!",
    //       sender: "Bob"
    //     },
    //     {
    //       dateSent: "2023-11-11",
    //       time: "11:47",
    //       body: "I'm in too!",
    //       sender: "Charlie"
    //     }
    //   ]
    // }
  ];
  