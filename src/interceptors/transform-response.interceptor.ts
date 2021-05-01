import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResponseApi } from "../models/response-api.model";

@Injectable()
export class TransformResponseInterceptor<T>
	implements NestInterceptor<T, ResponseApi<T>> {
	intercept(
		context: ExecutionContext,
		next: CallHandler<T>
	): Observable<ResponseApi<T>> {
		return next.handle().pipe(
			map((data) => ({
				data,
				statusCode: context.switchToHttp().getResponse().statusCode,
			}))
		);
	}
}
