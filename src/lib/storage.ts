// import moment from "moment";

type StorageKey = 'accessToken' | 'refreshToken' | string;

interface StorageBackend {
    setItem(key: StorageKey, value: string): void;
    getItem(key: StorageKey): string | null;
    removeItem(key: StorageKey): void;
    clear(): void;
}

//
class LocalStorageBackend implements StorageBackend {

    setItem(key: StorageKey, value: string) {
        localStorage.setItem(key, value);
    }

    getItem(key: StorageKey) {
        return localStorage.getItem(key);
    }

    removeItem(key: StorageKey) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}

// And so you can create like S
// SessionStorageBackend implements StorageBackend

class StorageService {
    private backend: StorageBackend;

    constructor(backend: StorageBackend = new LocalStorageBackend()) {
        this.backend = backend;
    }

    // Generic methods
    set(key: StorageKey, value: string) {
        this.backend.setItem(key, value);
    }

    get(key: StorageKey): string | null {
        return this.backend.getItem(key);
    }

    remove(key: StorageKey) {
        this.backend.removeItem(key);
    }

    clear() {
        this.backend.clear();
    }

    // Convenience methods
    setAccessToken(token: string) {
        this.set('accessToken', token);
    }

    getAccessToken(): string | null {
        return this.get('accessToken');
    }

    removeAccessToken() {
        this.remove('accessToken');
    }

    // setUserInfo(info: string|User) {
    //     const value = typeof info === 'string' ? info : JSON.stringify(info);
    //     this.set('userInfo', value);
    // }
    //
    // getUserInfo(): User | null {
    //
    //     const userInfoString = this.get('userInfo');
    //     if (!userInfoString) {
    //         return null;
    //     }
    //     const userInfo = JSON.parse(userInfoString);
    //     if (!userInfo) {
    //         return null;
    //     }
    //
    //     return {
    //         ...userInfo,
    //         // lastLoginAt: userInfo.lastLoginAt ? new Date(userInfo.lastLoginAt) : undefined,
    //         // currentLoginAt: userInfo.currentLoginAt ? moment(userInfo.currentLoginAt) : undefined,
    //         // basicInfoUpdatedAt: userInfo.basicInfoUpdatedAt ? moment(userInfo.basicInfoUpdatedAt) : undefined,
    //         // createdAt: userInfo.createdAt ? moment(userInfo.createdAt) : undefined,
    //         // updatedAt: userInfo.updatedAt ? moment(userInfo.updatedAt) : undefined,
    //     };
    // }

    // removeUserInfo() {
    //     this.remove('userInfo');
    // }

    // clearUserData() {
    //     this.removeAccessToken()
    //     this.removeUserInfo()
    // }

    // Add more specific helpers as needed
}

// app storage is available for use
export const appStorage = new StorageService(new LocalStorageBackend());