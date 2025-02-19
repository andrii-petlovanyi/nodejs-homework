import {
  logOut,
  resendEmail,
  signIn,
  signUp,
  updateAvatar,
  updateSubscription,
  verifyEmail,
} from "../services/users.js";

const signInCtrl = async (req, res) => {
  const body = req.body;

  const { token, user } = await signIn(body);

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        name: user.name,
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

const signUpCtrl = async (req, res) => {
  const body = req.body;

  const user = await signUp(body);

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      name: user.name,
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logOutCtrl = async (req, res) => {
  const { id } = req.user;

  await logOut(id);

  res.status(204).json();
};

const getCurrentUserCtrl = async (req, res) => {
  const { name, email, subscription } = req.user;

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user: {
        name,
        email,
        subscription,
      },
    },
  });
};

const updateSubsCtrl = async (req, res) => {
  const body = req.body;
  const { id } = req.user;

  const data = await updateSubscription(id, body);

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user: {
        name: data.name,
        email: data.email,
        subscription: data.subscription,
      },
    },
  });
};

const updateAvatarCtrl = async (req, res) => {
  const { id } = req.user;
  const file = req.file;

  const avatarURL = await updateAvatar(id, file);

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user: {
        avatarURL: avatarURL,
      },
    },
  });
};

const verifyEmailCtrl = async (req, res) => {
  const { verificationToken } = req.params;

  await verifyEmail(verificationToken);

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      message: "Verification successful",
    },
  });
};

const resendEmailCtrl = async (req, res) => {
  const { email } = req.body;

  await resendEmail(email);

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      message: "Verification email sent",
    },
  });
};

export {
  signInCtrl,
  signUpCtrl,
  logOutCtrl,
  getCurrentUserCtrl,
  updateSubsCtrl,
  updateAvatarCtrl,
  verifyEmailCtrl,
  resendEmailCtrl,
};
