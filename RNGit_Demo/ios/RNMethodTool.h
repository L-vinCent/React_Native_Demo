//
//  RNMethodTool.h
//  RNGit_Demo
//
//  Created by Liao PanPan on 2018/8/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <React/RCTEventEmitter.h>
#import <React/RCTBridge.h>
@interface RNMethodTool : RCTEventEmitter<RCTBridgeModule>

+(void)emitMethod;

@end
