type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
    Partial<Pick<Type, Key>>;

type MakeRequired<Type, Key extends keyof Type> = Type & {
    [P in Key]-?: Type[P];
};
