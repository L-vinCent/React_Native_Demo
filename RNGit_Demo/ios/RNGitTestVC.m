//
//  RNGitTestVC.m
//  RNGit_Demo
//
//  Created by Liao PanPan on 2018/8/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RNGitTestVC.h"
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import "RNMethodTool.h"
@interface RNGitTestVC ()
@property (weak, nonatomic) IBOutlet UILabel *testLabel;
@property(nonatomic,strong)RCTBridge *bridge;
@property(nonatomic,strong)RNMethodTool *tools;
@end

@implementation RNGitTestVC
@synthesize bridge = _bridge;

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
  self.testLabel.text = self.RNStr;
}



- (IBAction)btnClick:(id)sender {
  
  [RNMethodTool emitMethod];

//  [self.bridge enqueueJSCall:@"EventReminder"
//                      method:@"emit"
//                        args:@[@"EventReminder"]
//                  completion:NULL];

  
}

-(void)viewWillAppear:(BOOL)animated
{
  [self.navigationController.navigationBar setHidden:NO];

}
-(void)viewWillDisappear:(BOOL)animated
{
  [super viewWillDisappear:animated];
  [self.navigationController.navigationBar setHidden:YES];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
