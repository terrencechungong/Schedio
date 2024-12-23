export let MessageData = [
    {
      id: "1",
      dateSent: "2023-11-10",
      time: "14:35",
      body: "Hey there! How's it going?",
      sender: "Alice",
      reactions: [
        { emoji: "👍", reactor: "Bob", counted: false },
        { emoji: "❤️", reactor: "Charlie", counted: false }
      ],
      replies: [
        {
          dateSent: "2023-11-10",
          time: "14:36",
          body: "It's going well, thanks! How about you?",
          sender: "Bob"
        },
        {
          dateSent: "2023-11-10",
          time: "14:37",
          body: "Just getting ready for the weekend!",
          sender: "Alice"
        }
      ]
    },
    {
      id: "2",
      dateSent: "2023-11-10",
      time: "15:00",
      body: "Don't forget about the meeting tomorrow.",
      sender: "Charlie",
      reactions: [
        { emoji: "👀", reactor: "Alice", counted: false }
      ],
      replies: [
        {
          dateSent: "2023-11-10",
          time: "15:05",
          body: "Thanks for the reminder!",
          sender: "Alice"
        },
        {
          dateSent: "2023-11-10",
          time: "15:06",
          body: "Got it, see you there!",
          sender: "Bob"
        }
      ]
    },
    {
      id: "3",
      dateSent: "2023-11-11",
      time: "09:15",
      body: "Good morning everyone!",
      sender: "Bob",
      reactions: [
        { emoji: "☕", reactor: "Alice", counted: false },
        { emoji: "😊", reactor: "Charlie", counted: false }
      ],
      replies: [
        {
          dateSent: "2023-11-11",
          time: "09:16",
          body: "Good morning, Bob!",
          sender: "Alice"
        },
        {
          dateSent: "2023-11-11",
          time: "09:17",
          body: "Morning, all!",
          sender: "Charlie"
        }
      ]
    },
    {
      id: "4",
      dateSent: "2023-11-11",
      time: "11:45",
      body: "Who's up for lunch at noon?",
      sender: "Alice",
      reactions: [
        { emoji: "🍕", reactor: "Charlie", counted: false },
        { emoji: "🍔", reactor: "Bob", counted: false }
      ],
      replies: [
        {
          dateSent: "2023-11-11",
          time: "11:46",
          body: "Count me in!",
          sender: "Bob"
        },
        {
          dateSent: "2023-11-11",
          time: "11:47",
          body: "I'm in too!",
          sender: "Charlie"
        }
      ]
    }
  ];
  