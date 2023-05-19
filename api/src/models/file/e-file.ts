import { Entity } from '../../@cores/entity'
import * as Moment from 'moment'
import { MFile } from './m-file'

export class EFile extends Entity {

	private _filename: string = ''

	/**
	 * Getter filename
	 * @return {String }
	 */
	public get filename(): string {
		return this._filename
	}

	/**
	 * Setter filename
	 * @param {String } value
	 */
	public set filename(value: string) {
		this._filename = value
	}

	private _hash: string = ''

	/**
	 * Getter hash
	 * @return {String }
	 */
	public get hash(): string {
		return this._hash
	}

	/**
	 * Setter hash
	 * @param {String } value
	 */
	public set hash(value: string) {
		this._hash = value
	}

	private _type: number = 0

	/**
	 * Getter type
	 * @return {Number }
	 */
	public get type(): number {
		return this._type
	}

	/**
	 * Setter type
	 * @param {Number } value
	 */
	public set type(value: number) {
		this._type = value
	}

	private _extension: string = ''

	/**
	 * Getter extension
	 * @return {String }
	 */
	public get extension(): string {
		return this._extension
	}

	/**
	 * Setter extension
	 * @param {String } value
	 */
	public set extension(value: string) {
		this._extension = value
	}

	private _uploaded: Moment.Moment = Moment()

	/**
	 * Getter uploaded
	 * @return {Date }
	 */
	public get uploaded(): Moment.Moment {
		return this._uploaded
	}

	/**
	 * Setter uploaded
	 * @param {Date } value
	 */
	public set uploaded(value: Moment.Moment) {
		this._uploaded = value
	}

	private _status: number = 1

	/**
	 * Getter status
	 * @return {Number }
	 */
	public get status(): number {
		return this._status
	}

	/**
	 * Setter status
	 * @param {Number } value
	 */
	public set status(value: number) {
		this._status = value
	}

	private _req: any = null

	/**
	 * Getter req
	 * @return {any }
	 */
	public get req(): any {
		return this._req
	}

	/**
	 * Setter req
	 * @param {any } value
	 */
	public set req(value: any) {
		this._req = value
	}

	/**
	 * Getter file URI
	 * @return {String }
	 */
	public get fileURI(): string {
		return MFile.FILE_DIR[ this.type ].pathRoute + this._filename
	}
}
