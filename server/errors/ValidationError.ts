class ValidationError extends Error {
    public status = 400;
    public statusText = 'Bad Request';
    public code = 'BAD_REQUEST';
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export {
    ValidationError
}