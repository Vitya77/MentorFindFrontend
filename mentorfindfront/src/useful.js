function CustomCreateURL(url_or_file) {
    try {
        return URL.createObjectURL(url_or_file);
    }
    catch {
        return url_or_file;
    }
}

export {CustomCreateURL}