import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Project Manager' | 'Backend Developer' | 'Frontend Developer' | 'Full Stack Developer' | 'PR Manager' | 'UI/UX Designer' | 'QA Engineer' | 'DevOps Engineer' | 'Marketing Manager';
  lastActive: string;
  status: 'online' | 'offline' | 'away';
  permissions: {
    canAddUsers: boolean;
    canEditUsers: boolean;
    canDeleteUsers: boolean;
  };
}

interface UserState {
  users: User[];
  deletedUser: User | null;
}

const initialState: UserState = {
  users: [
    {
      id: 1,
      name: 'Hatem Soliman',
      email: 'hatemthedev@gmail.com',
      role: 'Admin',
      lastActive: '2 minutes ago',
      status: 'online',
      permissions: {
        canAddUsers: true,
        canEditUsers: true,
        canDeleteUsers: true,
      }
    },
    {
      id: 2,
      name: 'Fam Awad',
      email: 'fam@awadlouis.com',
      role: 'Backend Developer',
      lastActive: '5 minutes ago',
      status: 'online',
      permissions: {
        canAddUsers: false,
        canEditUsers: false,
        canDeleteUsers: false,
      }
    },
    {
      id: 3,
      name: 'Tony Makaryous',
      email: 'tonymakaryousm@gmail.com',
      role: 'Project Manager',
      lastActive: '15 minutes ago',
      status: 'away',
      permissions: {
        canAddUsers: false,
        canEditUsers: false,
        canDeleteUsers: false,
      }
    },
  ],
  deletedUser: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Omit<User, 'id' | 'lastActive' | 'status'>>) => {
      const newUser = {
        ...action.payload,
        id: Math.max(...state.users.map(u => u.id)) + 1,
        lastActive: 'Just now',
        status: 'online' as const,
      };
      state.users.push(newUser);
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      const userIndex = state.users.findIndex(user => user.id === action.payload);
      if (userIndex !== -1) {
        state.deletedUser = state.users[userIndex];
        state.users.splice(userIndex, 1);
      }
    },
    restoreUser: (state) => {
      if (state.deletedUser) {
        state.users.push(state.deletedUser);
        state.deletedUser = null;
      }
    },
    updateUser: (state, action: PayloadAction<Partial<User> & { id: number }>) => {
      const userIndex = state.users.findIndex(user => user.id === action.payload.id);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...action.payload };
      }
    },
  },
});

export const { addUser, deleteUser, restoreUser, updateUser } = userSlice.actions;
export default userSlice.reducer; 