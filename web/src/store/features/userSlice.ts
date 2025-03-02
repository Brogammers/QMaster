import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  deletedUser: null,
  loading: false,
  error: null,
};

export const fetchAdminUsers = createAsyncThunk('users/fetchUsers', async () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL_ADMIN_GET_USERS!;
  const response = await axios.get(url);  
  const userData = response.data.users.map((user: any) => ({
    id: user.id,
    name: `${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} ${user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}`,
    email: user.email,
    role: user.userRole === "ADMIN" ? "Admin" : "Project Manager",
    lastActive: "Just now",
    status: user.enabled ? 'online' : 'offline',
    permissions: {
      canAddUsers: user.userRole === 'ADMIN',
      canEditUsers: user.userRole === 'ADMIN',
      canDeleteUsers: user.userRole === 'ADMIN'
    },
  }));

  return userData;
});

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
  extraReducers: (builder) => {
    builder.addCase(fetchAdminUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAdminUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchAdminUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch users';
    });
  },
});

export const { addUser, deleteUser, restoreUser, updateUser } = userSlice.actions;
export default userSlice.reducer; 