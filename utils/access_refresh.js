function signToken(userId, secretKey, expiresIn) {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn,
            audience: userId,
        };

        jwt.sign({}, secretKey, options, (err, token) => {
            if (err) {
                reject({ isError: true, message: 'Invalid operation!' });
            } else {
                resolve(token);
            }
        });
    });
}

function signAccessToken(userId) {
    return signToken(userId, ACCESS_TOKEN_SECRET, process.env.ACCESS_EXPRIRES_IN);
}

function signRefreshToken(userId) {
    return signToken(userId, REFRESH_TOKEN_SECRET, process.env.REFRESH_EXPRIRES_IN);
}

async function reIssueTokens(refToken) {
    const payload = await verifyRefreshToken(refreshToken);
    const userId = payload.aud;

    // const userToken = find user token in DB

    if (!userToken) {
        throw { isError: true, message: 'User token does not exist' };
    }

    if (userToken !== refToken) {
        throw { isError: true, message: 'Old token. Not valid anymore.' };
    }

    const [accessToken, refreshToken] = await Promise.all([
        signAccessToken(userId),
        signRefreshToken(userId),
    ]);

    // update refresh token in DB

    return { accessToken, refreshToken };
}

function verifyRefreshToken(refreshToken) {
    // JWT verify
    return;
}
