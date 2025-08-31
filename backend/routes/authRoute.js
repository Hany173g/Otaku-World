const route = require('express').Router();
const signupContoller = require('../controller/userContollor')
const forgetPasswordContoller = require('../controller/forgetPasswordContoller')
const isAuth = require('./projectRoutes/isAuth')
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique user identifier
 *         username:
 *           type: string
 *           description: User's username (5-20 characters)
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         role:
 *           type: string
 *           default: "user"
 *           description: User's role
 *       required:
 *         - id
 *         - username
 *         - email
 *         - role
 *     
 *     Error:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Error message in Arabic
 *       required:
 *         - msg
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication operations
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Create a new user account
 *     description: Register a new user with username, email, and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 20
 *                 description: User's username (5-20 characters)
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 15
 *                 description: User's password (8-15 characters)
 *                 example: "mypassword123"
 *           examples:
 *             valid_signup:
 *               summary: Valid signup data
 *               value:
 *                 username: "john_doe"
 *                 email: "john.doe@example.com"
 *                 password: "mypassword123"
 *     responses:
 *       200:
 *         description: User account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "تم انشاء الحساب بنجاح"
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missing_data:
 *                 summary: Missing required data
 *                 value:
 *                   msg: "البينات ليست مكتمله"
 *               invalid_username:
 *                 summary: Invalid username length
 *                 value:
 *                   msg: "يجب ان يكون الأسم من 5 حروف الى 20 حرف"
 *               email_exists:
 *                 summary: Email already exists
 *                 value:
 *                   msg: "اسف هذا الأيميل مستخدم من قبل"
 */
route.post('/signup',isAuth,signupContoller.createNewUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 15
 *                 description: User's password
 *                 example: "mypassword123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "تم تسجيل الدخول بنجاح"
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request - authentication error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               user_not_found:
 *                 summary: User not found
 *                 value:
 *                   msg: "هذا الحساب غير موجود"
 *               wrong_password:
 *                 summary: Wrong password
 *                 value:
 *                   msg: "الرقم السري غير صحيح"
 */
route.post('/login',isAuth,signupContoller.login);

/**
 * @swagger
 * /api/auth/forget-password:
 *   post:
 *     summary: Request password reset
 *     description: Send a password reset link to the user's email address
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address to send reset link
 *                 example: "john.doe@example.com"
 *           examples:
 *             valid_email:
 *               summary: Valid email for password reset
 *               value:
 *                 email: "john.doe@example.com"
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني"
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missing_email:
 *                 summary: Missing email
 *                 value:
 *                   msg: "يرجى إدخال البريد الإلكتروني"
 *               invalid_email:
 *                 summary: Invalid email format
 *                 value:
 *                   msg: "صيغة البريد الإلكتروني غير صحيحة"
 *               email_not_found:
 *                 summary: Email not found
 *                 value:
 *                   msg: "البريد الإلكتروني غير موجود في النظام"
 */

/**
 * @swagger
 * /api/auth/forget-password/{id}:
 *   post:
 *     summary: Reset password with token
 *     description: Reset user password using the token from email
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reset token from email
 *         example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 15
 *                 description: New password (8-15 characters)
 *                 example: "newpassword123"
 *           examples:
 *             valid_password:
 *               summary: Valid new password
 *               value:
 *                 password: "newpassword123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "تم إعادة تعيين كلمة المرور بنجاح"
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missing_password:
 *                 summary: Missing password
 *                 value:
 *                   msg: "يرجى إدخال كلمة المرور الجديدة"
 *               invalid_password_length:
 *                 summary: Invalid password length
 *                 value:
 *                   msg: "يجب أن تكون كلمة المرور من 8 إلى 15 حرف"
 *               invalid_token:
 *                 summary: Invalid or expired token
 *                 value:
 *                   msg: "الرابط غير صحيح أو منتهي الصلاحية"
 *       404:
 *         description: Token not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               token_not_found:
 *                 summary: Token not found
 *                 value:
 *                   msg: "الرابط غير موجود"
 */

route.post('/forget-password',isAuth,forgetPasswordContoller.forgetPassword);
route.post('/forget-password/:id',isAuth,forgetPasswordContoller.resetPassword);

route.get('/forget-password/:id',isAuth,forgetPasswordContoller.checkCode)


module.exports = route;
