export const CalculateTimeDifference = (captureTime: number) => 
{
    const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds
    const timeDifference = currentTime - captureTime;

    const seconds = timeDifference;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours >= 2) {
        return `${hours} hours ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else {
        return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
    }
}