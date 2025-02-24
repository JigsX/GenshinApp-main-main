import { create } from 'zustand';
const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log("🔍 API_BASE_URL:", API_BASE_URL);

export const contentStore = create((set) => ({
  contents: [],
  setContents: (contents) => set({ contents }), 

  // Create new content
  createContent: async (newContent) => {
    if (!(newContent.title && newContent.character && newContent.category && newContent.image)) {
      return {
        success: false,
        message: 'Please provide all fields!',
      };
    }

    try {
      const res = await fetch(`${API_BASE_URL}/genshinContent/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContent),
      });

      if (!res.ok) {
        throw new Error('Failed to create content');
      }

      const contentData = await res.json();
      set((state) => ({ contents: [...state.contents, contentData.data] }));

      return {
        success: true,
        message: 'Content Posted!',
      };
    } catch (error) {
      console.error('Error creating content:', error);
      return {
        success: false,
        message: 'Failed to create content. Please try again.',
      };
    }
  },

  // Fetch all contents
  fetchContents: async () => {

    const res = await fetch(`${API_BASE_URL}/genshinContent/`);
    if (!res.ok) {
      const contentDatas = await res.json();
      throw new Error(contentDatas.data);
    }


    const contentData = await res.json();
    set({ contents: contentData.data });

  },

  // Delete content
  deleteContent: async (contentID) => {
    try {
      const res = await fetch(`${API_BASE_URL}/genshinContent/${contentID}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete content');
      }

      const updatedData = await res.json();
      set((state) => ({
        contents: state.contents.filter((content) => content._id !== contentID),
      }));

      return {
        success: true,
        message: updatedData.message,
      };
    } catch (error) {
      console.error('Error deleting content:', error);
      return {
        success: false,
        message: 'Failed to delete content. Please try again.',
      };
    }
  },

  // Update content
  updateContent: async (contentID, updatedContent) => {
    try {
      const res = await fetch(`${API_BASE_URL}/genshinContent/${contentID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContent),
      });

      if (!res.ok) {
        throw new Error('Failed to update content');
      }

      const updatedContentData = await res.json();
      if (!updatedContentData.success) {
        return {
          success: false,
          message: updatedContentData.message,
        };
      }

      set((state) => ({
        contents: state.contents.map((content) =>
          content._id === contentID ? updatedContentData.data : content
        ),
      }));

      return {
        success: true,
        message: updatedContentData.message,
      };
    } catch (error) {
      console.error('Error updating content:', error);
      return {
        success: false,
        message: 'Failed to update content. Please try again.',
      };
    }
  },
}));