//处理数据管道工具函数

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Processor<T,C=any>=(
    data:T,
    context?:C
)=>T|Promise<T>

export const createPipeline = <T,C>(...processors:Processor<T,C>[]):Processor<T,C>=>{
    return async (data:T,context?:C)=>{
        let result=data
        for(const processor of processors){
            result=await processor(result,context)
        }
        return result
    }
}