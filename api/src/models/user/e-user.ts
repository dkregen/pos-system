import { Entity } from '../../@cores/entity'
import { MUser } from './m-user'
import { EFile } from '../file/e-file'

export class EUser extends Entity {

	constructor() {
		super()
	}

	private _username: string = ''

	/**
	 * Getter username
	 * @return {string}
	 */
	public get username(): string {
		return this._username
	}

	/**
	 * Setter username
	 * @param {string} value
	 */
	public set username(value: string) {
		this._username = !!value ? value : null
	}

	private _email: string = ''

	/**
	 * Getter email
	 * @return {string}
	 */
	public get email(): string {
		return this._email
	}

	/**
	 * Setter email
	 * @param {string} value
	 */
	public set email(value: string) {
		this._email = value
	}

	private _password: string = ''

	/**
	 * Getter password
	 * @return {string}
	 */
	public get password(): string {
		return this._password
	}

	/**
	 * Setter password
	 * @param {string} value
	 */
	public set password(value: string) {
		this._password = !!value ? value : undefined
	}

	private _fullName: string = ''

	/**
	 * Getter fullName
	 * @return {string}
	 */
	public get fullName(): string {
		return this._fullName
	}

	/**
	 * Setter fullName
	 * @param {string} value
	 */
	public set fullName(value: string) {
		this._fullName = value
	}

	private _idFilePicture: string = ''

	/**
	 * Getter idFilePicture
	 * @return {string}
	 */
	public get idFilePicture(): string {
		return this._idFilePicture
	}

	/**
	 * Setter idFilePicture
	 * @param {string} value
	 */
	public set idFilePicture(value: string) {
		this._idFilePicture = value
	}

	private _privilege: number = MUser.PRIV_NOPRIVILEGE

	/**
	 * Getter privilege
	 * @return {number}
	 */
	public get privilege(): number {
		return this._privilege
	}

	/**
	 * Setter privilege
	 * @param {number} value
	 */
	public set privilege(value: number) {
		this._privilege = value
	}

	private _status: number = MUser.STATUS_INACTIVE

	/**
	 * Getter status
	 * @return {number}
	 */
	public get status(): number {
		return this._status
	}

	/**
	 * Setter status
	 * @param {number} value
	 */
	public set status(value: number) {
		this._status = value
	}

	private _permission: number = 0

	/**
	 * Getter permission
	 * @return {number }
	 */
	public get permission(): number {
		return this._permission
	}

	/**
	 * Setter permission
	 * @param {number } value
	 */
	public set permission(value: number) {
		this._permission = value
	}

	private _image: EFile = new EFile()

	/**
	 * Getter picture
	 * @return {EFile }
	 */
	public get image(): EFile {
		return this._image
	}

	/**
	 * Setter picture
	 * @param {EFile } value
	 */
	public set image(value: EFile) {
		this._image = value
	}

	public getDataRelation(): any {}

}
